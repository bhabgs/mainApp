import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTableList } from 'inl-ui/dist/hooks';
import { useOptions } from '@/hooks/useOptions';
import { ramdomString } from '@/utils/random';

import { ReloadOutlined } from '@ant-design/icons-vue';
import ResultItem from './resultItem';
import * as api from '@/api/pages/globalSearch';

/**
 * 全局搜索
 */
const GlobalSearch = defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const form = ref<any>({
      keyword: '',
      timeRange: [],
      source: undefined,
    });

    const ramdomSessionKey = ramdomString(16);

    const { tableList, isLoading, refresh, currPage, pageSize, pagination } =
      useTableList(
        async () => {
          let { data } = await api.postSearch({
            searchContent: form.value.keyword,
            startTime: form.value.timeRange?.[0]?.startOf('day')?.valueOf(),
            endTime: form.value.timeRange?.[1]?.endOf('day')?.valueOf(),
            sourceName: form.value.source,
            pageNum: currPage.value,
            pageSize: pageSize.value,
            sessionKey: ramdomSessionKey,
          });
          data = data[0];
          if (!data) throw new TypeError();
          data.total = data.pageConfig.total;
          return { data };
        },
        'dataList',
        'total',
      );

    const onKeywordChange = () => {
      router.push({
        path: '/',
        query: {
          extraPageKey: 'globalSearch',
          keyword: form.value.keyword,
          noRefresh: 1,
        },
      });
    };

    const search = async () => {
      currPage.value = 1;
      await refresh();
    };
    watch([() => form.value.timeRange, () => form.value.source], search, {
      deep: true,
    });
    // query中携带搜索关键字
    watch(
      route,
      () => {
        if (route.query.keyword) {
          form.value.keyword = `${route.query.keyword}`;
          if (!route.query.noRefresh) {
            search();
          }
        }
      },
      { deep: true, immediate: true },
    );

    // 来源列表
    const souceList = useOptions(api.getSourceList, 'sourceDesc', 'sourceName');
    watch(souceList, (val) => (form.value.source = val[0]?.value));

    /* ===== 热搜 ===== */
    const hotList = ref<any[]>([]);
    const hotListLoading = ref(false);
    const getHotList = async () => {
      hotListLoading.value = true;
      try {
        const { data } = await api.getHotList();
        hotList.value = data;
      } finally {
        hotListLoading.value = false;
      }
    };
    onMounted(getHotList);

    // 点击热搜 使用热搜条目搜索
    const handleHotClick = (record: any, index: number) => {
      // 截取前30个字
      form.value.keyword = record.searchText.slice(0, 30);
      onKeywordChange();
      search();
    };

    return () => (
      <div class='global-search'>
        <div class='left-area'>
          <div class='search-container'>
            <div class='keyword'>
              <a-input
                class='input'
                style={{ width: '500px' }}
                allowClear
                maxlength={30}
                v-model={[form.value.keyword, 'value']}
                onPressEnter={search}
                onChange={onKeywordChange}
              />
              <a-button class='btn-search' type='primary' onClick={search}>
                搜索
              </a-button>
            </div>
            <div class='advanced'>
              <a-form layout='inline' model={form.value}>
                <a-form-item label='时间'>
                  <a-range-picker
                    style={{ width: '300px' }}
                    v-model={[form.value.timeRange, 'value']}
                  ></a-range-picker>
                </a-form-item>
                <a-form-item label='来源'>
                  <a-select
                    style={{ width: '200px' }}
                    options={souceList.value}
                    v-model={[form.value.source, 'value']}
                  ></a-select>
                </a-form-item>
              </a-form>
            </div>
          </div>
          <a-spin
            wrapperClassName='result-list-spin'
            spinning={isLoading.value}
          >
            {tableList.value.length ? (
              <ul class='result-list'>
                {tableList.value.map((item, index) => (
                  <>
                    <ResultItem record={item} />
                    {index !== 4 && (
                      <a-divider style={{ margin: '16px 0' }}></a-divider>
                    )}
                  </>
                ))}
              </ul>
            ) : (
              <img
                class='empty-img'
                src='/micro-assets/platform_web/empty.png'
                alt=''
              />
            )}
          </a-spin>
          {tableList.value.length > 0 && (
            <a-pagination
              style={{ marginTop: '16px', textAlign: 'center' }}
              {...pagination}
            ></a-pagination>
          )}
        </div>
        <div class='right-area'>
          <a-card
            v-slots={{
              title: () => (
                <div class='hot-title'>
                  <img
                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAAAXNSR0IArs4c6QAAA8dJREFUSEuNlW1MlnUUxn/X/TCx+pDLgShQgAQ62ZptlMPcolpFDMgwKLWc02GsV2t9qFbNTb+01ovp2iKtsXyJCgwI2bKsVb70wbUWSIpCgLyImSXNBs9zn/YADz6v8Py/3buvc65zzv+6/kfEceyHJY+C7sBjr6qg7WIcIVMQxQO27/MqwfaD+nDcVVrRfjyeOD8mXoJnMfediaQaweV+3dX2Uzwk8REcXlyDy8agvi8hJ1+FbZ0zkcRHcGhxD1h6WLJj3N2xXMKdjmRGAjuUW4jLt1GTOM5G3XNyl32TvRCfk6t7T7WE42YmaM05AJRFr1LdJP5+swrxWmvuMFKZ7us4EowNIbA6PKrAFwDYwax88BzHphGDKFfR6XpryRkGxrDRW1XcPRjIEUrwVc5mFZ962//T/Elbsn/EKLhaUXjD5ldVA449g6veCZHRpOLTpREEZjg0Zw/h9eZrZXe3NWU/ibFjJpUg/sVoANYGYR9UaeeXIT6wA5kl4DTisTW49hs4xzCumawqlMf8lU9ro5OUnVkiYVM9W8PCw5jdiaNtuG45sCjCh8ILehezF0IYo0nFQ4lKzzaP/7K6zNvwMGF/4z/E7BijcSnvSqA+6znM3iK8keBvUaeHuioDBI3ISmacNwzo4e4F43V8llkDdtXdEcEawbrmyD7PWITP2qd5l1yky5hdjzioij8eGCdoyU5kZKwdIytmYR7Lk3160zZcezkmSDoB1ozxGmKzHumZfPTA9mVUgrs/NoFbJNuTfhRYFgoK3JqBw/M4+hmffY13NEOPD52fMqJfBXtv7MQsRhdWLvsk7QKmuRNBgVuassklHGXh0xwcX5XW9r0UXq3Vpm9F9krULjzOCllt2hXMwlQz2YGjF/VY75tWl3YD9I2ogtEIgo9Sl+Hgn0L4cfH5UmQfp/ZjNj9SBHRwbf8t0ZIGY6123nX4PP8gnFBv6IjWnVsu2z2/HrQyYkSiSOsHWuOQLrZ7QQ+Q7n/Axo9/AGbrtGGwVrYrpQjT5DseAKhbGwYy40k+fnMfppwBv1wD4tCv9PYv1RbcCaPVpDRiBBvtC1UNroqb4IOUs0CgoCvgKVDVuV8CzWA7UueS4P0OyJsU015VD62Jh8C2k8is5BFQAtgYSqjQpn7/kpqa1kTO7SlJJLhNwO2Io6o+H7QHYlPZ+0lLMZ1AXAatVvVQczA6dOG8ziySk94AniDBO0+b/vp7pi5sZ9JWoATzrdZTF9vC8VF3su1MLsD1zdbTf0Zf9kFZ7L2k9VwY3qMtkR7xw/4H3RJjsyRFVbEAAAAASUVORK5CYII='
                    alt=''
                  />
                  热门搜索
                </div>
              ),
              extra: () => (
                <ReloadOutlined
                  style={{
                    color: '#4b5bae',
                    fontSize: '18px',
                    transform: 'rotateY(180deg)',
                  }}
                  onClick={getHotList}
                />
              ),
              default: () => (
                <a-spin spinning={hotListLoading.value}>
                  <ul class='hot-list'>
                    {hotList.value.map((item, index) => (
                      <>
                        <li
                          class='list-item'
                          onClick={() => handleHotClick(item, index)}
                        >
                          <span class='no'>{index + 1}</span>
                          <span class='content'>{item.searchText}</span>
                        </li>
                        {index !== hotList.value.length - 1 && (
                          <a-divider style={{ margin: '12px 0' }}></a-divider>
                        )}
                      </>
                    ))}
                  </ul>
                </a-spin>
              ),
            }}
          ></a-card>
        </div>
      </div>
    );
  },
});

export default GlobalSearch;
