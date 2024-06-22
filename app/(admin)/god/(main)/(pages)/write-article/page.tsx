"use client";

import { App, Button, Flex, Form, Input, Select } from "antd";
import React from "react";
import "@/libs/mde-theme/dark.css";
import Editor from "for-editor";
import { useCreateArticle } from "@/hooks/requests/article/use-create-article";
import FormItem from "antd/es/form/FormItem";
import { Article } from "@/server/src/db/schema/articles";
import { useMemoizedFn } from "ahooks";
import CategorySelector from "@/components/selectors/CategorySelector";

export default function Page() {
  const { message } = App.useApp();

  // 表单实例
  const [form] = Form.useForm<Article>();

  // 创建文章请求
  const { runAsync, loading } = useCreateArticle(form);

  const submit = useMemoizedFn(() => {
    form.validateFields().then(() => {
      runAsync().then((res) => {
        if (res.code === 200) {
          message.success("文章发布成功");
        }
      });
    });
  });

  return (
    <>
      <Form size="large" form={form}>
        <Flex vertical gap={12}>
          <Flex gap={12}>
            <FormItem name="categoryId">
              <CategorySelector style={{ width: 200 }} />
            </FormItem>
            <FormItem
              name="title"
              rules={[{ required: true, message: "文章标题不能为空" }]}
              className="flex-grow"
            >
              <Input placeholder="请输入文章标题" />
            </FormItem>
            <Button loading={loading} type="primary" onClick={submit}>
              发布
            </Button>
          </Flex>
          <FormItem
            name="content"
            rules={[{ required: true, message: "文章内容不能为空" }]}
            initialValue="**Hello world!!!**"
          >
            <Editor preview subfield />
          </FormItem>
        </Flex>
      </Form>
    </>
  );
}
