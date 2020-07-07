import React, { useState, useEffect } from "react";
import Form from "antd/lib/form/Form";
import { Input } from "antd";

const InputTextArea = ({textDescriptions}) => {
  return (
    <Form.Item
      name="description"
      rules={[
        {
          required: true,
          message: "Please input description!",
        },
      ]}
    >
      <label>
        <Input.TextArea
          placeholder="Create new Description"
          defaultValue={`${textDescriptions}`}
        />
        a
      </label>
    </Form.Item>
  );
};

export default InputTextArea;
