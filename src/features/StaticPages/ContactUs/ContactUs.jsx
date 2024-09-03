import { createZendeskTicketSlice } from '@/state/redux/integration/integrationSlice';
import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ContactUsStyled from './ContactUs.styles';

const { TextArea } = Input;

const ContactUs = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [contactLoader, setContactLoader] = useState();

  const onFinish = async (values) => {
    await setContactLoader(true);
    const { name, message, email } = values;
    await dispatch(
      createZendeskTicketSlice({
        name,
        message,
        email,
        setContactLoader,
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ContactUsStyled className='container mx-auto border-b border-gray-100 pb-36'>
      <h1 className='my-20 text-center text-4xl text-orange'>Contact Us</h1>
      <Card>
        <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item
            label='Name'
            required
            name='name'
            rules={[
              {
                required: true,
                message: 'Please enter your Name',
              },
            ]}
          >
            <Input placeholder='Enter Your Name' />
          </Form.Item>
          <Form.Item
            label='E-mail'
            required
            name='email'
            rules={[
              {
                type: 'email',
                message: 'The email is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter your E-mail!',
              },
            ]}
          >
            <Input placeholder='Enter Your E-mail' />
          </Form.Item>
          <Form.Item
            label='Message'
            required
            name='message'
            rules={[
              {
                required: true,
                message: 'Please enter your message',
              },
            ]}
          >
            <TextArea rows={4} placeholder='Enter Your Message' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={contactLoader}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </ContactUsStyled>
  );
};

export default ContactUs;
