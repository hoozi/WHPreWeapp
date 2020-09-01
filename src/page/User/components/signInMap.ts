import { InputProps } from '@tarojs/components/types/Input'; 
import { InternalFieldProps } from 'rc-field-form/es/Field';

interface SignInItem {
  name: string;
  title: string;
  props: InputProps;
  options?: InternalFieldProps;
}

const signInList:SignInItem[] = [
  {
    name: 'username',
    title: '账号',
    props: {
      placeholder: '账号',
      placeholderStyle: 'color:#999'
    },
    options: {
      trigger: 'onInput',
      rules: [
        {
          required: true,
          message: '请输入账号',
          validateTrigger: 'onInput'
        }
      ]
    }
  },
  {
    name: 'password',
    title: '密码',
    props: {
      placeholder: '密码',
      placeholderStyle: 'color:#999'
    },
    options: {
      trigger: 'onInput',
      rules: [
        {
          required: true,
          message: '请输入密码',
          validateTrigger: 'onInput'
        }
      ]
    }
  }
]

export default signInList;