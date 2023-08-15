import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import { Modal, message } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import { encodeStr } from '@/utils/base64';
import { getRequiredRule } from '@/utils/validation';

import EditPasswordForm, { IEditPasswordForm } from './editPasswordForm';
import api from '@/api/pages/personalSetting';

/**
 * 个人设置
 */
const PersonalSetting = defineComponent({
  setup(prop, context) {
    const formRef = ref();
    const passwordFormRef = ref();

    const state = reactive({
      canEdit: false,
    });

    const formState = ref<any>({});
    const copyForm = ref<any>({});

    const passwordForm = ref<IEditPasswordForm>({
      checkPassWord: '',
      oldPassWord: '',
      passWord: '',
    });

    onMounted(async () => {
      const resp = await api.detail({});
      formState.value = resp.data;
      copyForm.value = cloneDeep(formState.value);
    });

    const handleSubmit = async () => {
      await formRef.value.validate();
      const resp = await api.editUserRecord({
        ...formState.value,
        oldPassWord: formState.value.passWord,
      });

      state.canEdit = false;
      message.success(resp.data);
    };

    /* 修改密码 */
    const visible = ref(false);
    const handleSavePassword = async () => {
      await passwordFormRef.value._validate();
      const resp = await api.changePassword({
        oldPassWord: encodeStr(passwordForm.value.oldPassWord),
        passWord: encodeStr(passwordForm.value.passWord),
        userId: formState.value.userId,
      });
      message.info(resp?.data);

      visible.value = false;
    };
    watch(visible, (val) => {
      if (!val) {
        passwordFormRef.value._reset();
      }
    });

    // 点击取消
    const handleCancelClick = () => {
      state.canEdit = false;
      formState.value = copyForm.value;
      formRef.value.clearValidate();
    };

    return () => (
      <div class='personal-setting'>
        <div class='titleLine'>
          <div class='title'>基本信息</div>
          <a-space>
            <a-button
              type='primary'
              onClick={() => {
                state.canEdit = true;
              }}
            >
              修改信息
            </a-button>
            <a-button
              onClick={() => {
                visible.value = true;
              }}
            >
              修改密码
            </a-button>
          </a-space>
        </div>

        <a-form
          ref={formRef}
          model={formState.value}
          label-col={{ style: { width: '100px' } }}
          name='basic'
          onSubmit={handleSubmit}
          style='min-width: 400px; max-width: 500px;'
        >
          <a-form-item
            name='userName'
            label='用户名'
            rules={[
              getRequiredRule('用户名'),
              {
                pattern: /^[0-9a-zA-Z]*$/g,
                message: '只能输入数字和字母',
              },
            ]}
          >
            {state.canEdit ? (
              <a-input
                v-model={[formState.value.userName, 'value']}
                placeholder='请输入'
              />
            ) : (
              <span>{formState.value.userName || '-'}</span>
            )}
          </a-form-item>

          <a-form-item
            name='roleTypeNames'
            label='所属角色'
            rules={[{ required: true }]}
          >
            {state.canEdit ? (
              <a-input
                disabled
                v-model={[formState.value.roleTypeNames, 'value']}
                placeholder='请输入'
              />
            ) : (
              <span>{formState.value.roleTypeNames || '-'}</span>
            )}
          </a-form-item>

          <a-form-item
            name='phone'
            label='电话'
            rules={[
              getRequiredRule('电话'),
              {
                pattern: /^(1)\d{10}$/,
                message: '请输入正确的手机号',
                trigger: 'blur',
              },
            ]}
          >
            {state.canEdit ? (
              <a-input
                v-model={[formState.value.phone, 'value']}
                placeholder='请输入'
              />
            ) : (
              <span>{formState.value.phone || '-'}</span>
            )}
          </a-form-item>

          <a-form-item name='zhixin' label='智信'>
            {state.canEdit ? (
              <a-input
                v-model={[formState.value.zhixin, 'value']}
                placeholder='请输入'
              />
            ) : (
              <span>{formState.value.zhixin || '-'}</span>
            )}
          </a-form-item>

          <a-form-item name='wechat' label='微信'>
            {state.canEdit ? (
              <a-input
                v-model={[formState.value.wechat, 'value']}
                placeholder='请输入'
              />
            ) : (
              <span>{formState.value.wechat || '-'}</span>
            )}
          </a-form-item>

          <a-form-item
            name='mail'
            label='邮箱'
            rules={[{ type: 'email', message: '请输入正确的邮箱' }]}
          >
            {state.canEdit ? (
              <a-input
                v-model={[formState.value.mail, 'value']}
                placeholder='请输入'
              />
            ) : (
              <span>{formState.value.mail || '-'}</span>
            )}
          </a-form-item>

          {state.canEdit && (
            <a-form-item>
              <a-space class='save'>
                <a-button type='primary' onClick={handleSubmit}>
                  保存
                </a-button>

                <a-button html-type='button' onClick={handleCancelClick}>
                  取消
                </a-button>
              </a-space>
            </a-form-item>
          )}
        </a-form>

        <Modal
          title='修改密码'
          width={520}
          v-model={[visible.value, 'visible']}
          onOk={handleSavePassword}
        >
          <div style='padding: 0 0 10px 10px'>
            密码由字母、数字、特殊字符组成，字母区分大小写，长度为8-14个字符
          </div>
          <EditPasswordForm ref={passwordFormRef} form={passwordForm.value} />
        </Modal>
      </div>
    );
  },
});

export default PersonalSetting;
