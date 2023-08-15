import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { useTableList } from 'inl-ui/dist/hooks';

import { message, Modal } from 'ant-design-vue';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { CheckboxChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import * as api from '@/api/pages/personalCenter';

/**
 * 消息订阅
 */
const MsgSubscribe = defineComponent({
  emits: ['update'], // 删除/标记已读 后需要调用
  props: {
    read: {
      type: [Number, null] as PropType<0 | 1 | null>,
      required: true,
    },
    noService: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      channelId: null,
      keyword: '',
    });
    const unreadCount = ref(0);

    const {
      refresh,
      tableList,
      total,
      isLoading,
      currPage,
      pageSize,
      handlePageChange,
      hanldePageSizeChange,
    } = useTableList(
      async () => {
        if (props.noService) {
          return Promise.resolve({ data: { dataList: [], totalCount: 0 } });
        }
        var res = await api.getMessageList({
          ...form.value,
          read: props.read,
          pageSize: pageSize.value,
          pageNum: currPage.value,
        });
        unreadCount.value = res.data.unreadMsgCount;
        return res;
      },
      'dataList',
      'totalCount',
    );
    onMounted(refresh);

    // 通道变化 触发搜索
    watch(
      () => form.value.channelId,
      () => {
        currPage.value = 1;
        refresh();
      },
    );

    // 批量删除
    const checkedKeys = ref<string[]>([]);
    watch(currPage, () => {
      checkedKeys.value = [];
    });
    const batchDelete = () => {
      if (!checkedKeys.value.length) {
        return message.warn('请选择通知');
      }
      Modal.confirm({
        title: '确定删除',
        content: `确定删除${checkedKeys.value.length}条通知?`,
        async onOk() {
          if (props.noService) return;
          await api.batchDeleteMessage(checkedKeys.value);
          message.success('删除成功');
          refresh();
          emit('update');
        },
      });
    };

    // 消息通道
    const channelList = ref<any[]>([]);
    const getChannelList = async () => {
      if (props.noService) return;
      const { data } = await api.getMsgChannel();
      channelList.value = [
        { id: null, name: '全部类型', unReadCount: 0 },
        ...data,
      ];
    };
    onMounted(getChannelList);

    // 查看详情
    const isDetailShow = ref(false);
    const detailRecord = ref<any>({});
    const handleViewDetail = async (record: any) => {
      if (props.noService) return;
      detailRecord.value = record;
      isDetailShow.value = true;
      if (!record.read) {
        await api.setMessageRead(record.id);
        emit('update');
      }
    };

    // 删除
    const handleDelete = (record: any) => {
      Modal.confirm({
        title: '确定删除',
        content: `确定删除通知“${record.content}”?`,
        async onOk() {
          if (props.noService) return;
          await api.batchDeleteMessage([record.id]);
          message.success('删除成功');
          refresh();
          emit('update');
        },
      });
    };

    // 设置所有通知已读
    const handleReadAll = () => {
      Modal.confirm({
        title: '确定已读',
        content: '确定标记所有通知为已读?',
        async onOk() {
          if (props.noService) return;
          await api.setAllMessageRead();
          refresh();
          emit('update');
        },
      });
    };

    return () => (
      <div class='msg-subscribe'>
        <div class='filter'>
          {/* 通道列表 */}
          <div class='channel-list'>
            {channelList.value.map((item) => (
              <div
                class={{
                  'channel-list-item': true,
                  active: form.value.channelId === item.id,
                }}
                onClick={() => (form.value.channelId = item.id)}
              >
                {item.name}
                {item.unReadCount > 0 && `(${item.unReadCount})`}
              </div>
            ))}
          </div>
          <div class='keyword'>
            <a-space>
              <a-input
                placeholder='请输入关键字'
                v-model={[form.value.keyword, 'value']}
                onPressEnter={() => {
                  currPage.value = 1;
                  refresh();
                }}
              ></a-input>
              <a-button
                type='primary'
                onClick={() => {
                  currPage.value = 1;
                  refresh();
                }}
              >
                搜索
              </a-button>
            </a-space>
          </div>
        </div>

        {/* 操作按钮 */}
        <a-space class='operation-container'>
          <a-button
            type='link'
            disabled={!unreadCount.value}
            onClick={handleReadAll}
          >
            <CheckOutlined />
            全部标记为已读
          </a-button>
          <a-button
            type='link'
            disabled={!checkedKeys.value.length}
            onClick={batchDelete}
          >
            <DeleteOutlined />
            批量删除
          </a-button>
        </a-space>

        <a-checkbox-group
          style={{ display: 'block' }}
          v-model={[checkedKeys.value, 'value']}
        >
          <a-list
            class='list'
            rowKey='id'
            pagination={false}
            loading={isLoading.value}
            dataSource={tableList.value}
          >
            {{
              renderItem: ({ item }: any) => (
                <a-list-item
                  class={{ 'list-item': true, read: item.read }}
                  v-slots={{
                    extra: () => (
                      <div class='right'>
                        <div class='desc'>
                          <a-space size={26}>
                            <span>
                              <icon-font
                                class='icon'
                                type='icon-xitongguanli_yonghuquanxianguanli_yonghuguanli'
                              ></icon-font>
                              {item.sendPerson}
                            </span>
                            <span>
                              <icon-font
                                class='icon'
                                type='icon-icon_xitonglei_shijian'
                              ></icon-font>
                              {item.sendDt}
                            </span>
                          </a-space>
                        </div>
                        <div class='operation'>
                          <a-button
                            class='btn-delete'
                            type='link'
                            onClick={() => handleDelete(item)}
                          >
                            删除
                          </a-button>
                        </div>
                      </div>
                    ),
                  }}
                >
                  <a-checkbox
                    style={{ marginRight: '16px' }}
                    value={item.id}
                  ></a-checkbox>
                  <a-list-item-meta description={item.content}>
                    {{
                      title: () => (
                        <a onClick={() => handleViewDetail(item)}>
                          {item.channelName}
                        </a>
                      ),
                      // avatar: () => (
                      //   <a-avatar style={{ backgroundColor: '#1ACAD7' }}>
                      //     {{
                      //       icon: () => (
                      //         <sound-filled style={{ color: '#fff' }} />
                      //       ),
                      //     }}
                      //   </a-avatar>
                      // ),
                    }}
                  </a-list-item-meta>
                </a-list-item>
              ),
            }}
          </a-list>
        </a-checkbox-group>
        <div class='page-area'>
          {tableList.value.length > 0 && (
            <a-checkbox
              checked={checkedKeys.value.length === tableList.value.length}
              indeterminate={
                checkedKeys.value.length !== 0 &&
                checkedKeys.value.length !== tableList.value.length
              }
              onChange={(e: CheckboxChangeEvent) => {
                if (e.target.checked) {
                  checkedKeys.value = tableList.value.map(
                    (item: any) => item.id,
                  );
                } else {
                  checkedKeys.value = [];
                }
              }}
            >
              全选
            </a-checkbox>
          )}
          <a-pagination
            class='pagination'
            showQuickJumper
            showSizeChanger
            current={currPage.value}
            pageSize={pageSize.value}
            total={total.value}
            showTotal={(total: number) => `共${total}条`}
            onUpdate:current={handlePageChange}
            onUpdate:pageSize={hanldePageSizeChange}
          ></a-pagination>
        </div>

        <a-modal title='通知详情' v-model={[isDetailShow.value, 'visible']}>
          {{
            footer: () => (
              <a-space>
                <a-button
                  type='primary'
                  onClick={() => (isDetailShow.value = false)}
                >
                  关闭
                </a-button>
              </a-space>
            ),
            default: () => (
              <a-descriptions column={1}>
                <a-descriptions-item label='通知标题'>
                  {detailRecord.value.title}
                </a-descriptions-item>
                <a-descriptions-item label='发送时间'>
                  {detailRecord.value.sendDt}
                </a-descriptions-item>
                <a-descriptions-item label='通知内容'>
                  {detailRecord.value.content}
                </a-descriptions-item>
              </a-descriptions>
            ),
          }}
        </a-modal>
      </div>
    );
  },
});

export default MsgSubscribe;
