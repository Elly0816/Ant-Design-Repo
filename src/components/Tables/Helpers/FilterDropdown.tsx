import { FilterDropdownProps } from "antd/es/table/interface";
import { Button, ColProps, Form, InputNumber, Radio, Space } from "antd";
import { ReactElement, CSSProperties } from "react";
import { Store } from "antd/es/form/interface";
import {FilterFilled, DeleteFilled, CloseCircleFilled} from '@ant-design/icons'

interface customFilterDropdownProps extends Omit<FilterDropdownProps, "prefixCls" | "visible"> {
    title: string,
}

const filterOptions = {
    "Greater Than" : '>',
    "Less Than": "<",
    "Equal To": "=",
    "Greater Than or Equal To": ">=",
    "Less Than or Equal To": "<="
}

const labelProps: ColProps = {
     span: 24,
     flex: 'row'
    };

const formStyle: CSSProperties = {
    maxWidth: '300px',
    padding: '5%',
}

const labelStyle: CSSProperties = {
    fontWeight: 'bolder'
}

const formItemStyle: CSSProperties = {
    width: "100%",
}

const buttons: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly'
}


export const Dropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close, title }: customFilterDropdownProps): ReactElement => {

    const [form] = Form.useForm();

    const handleSubmit = (values: {action: string, value: string}): void => {
        if (values.action && values.value){
            console.log(values);
            setSelectedKeys([{...values, title}] as unknown as React.Key[]);
            confirm();
        }
    }

    const shouldClear = clearFilters as ()=> void;

    const handleFilterClear = (): void => {
        console.log('clear was clicked');
        shouldClear();
        form.resetFields();
        confirm();
      };
return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={formStyle}
    initialValues={selectedKeys.length ?  selectedKeys[0] as unknown as Store : {}}
    onFinish={handleSubmit}
    autoComplete="off"
    form={form}
  >
        <Form.Item
        label= {<div style={labelStyle}>Action</div>}
        labelCol={labelProps}
        rules={[{ required: true, message: "Please pick an action!" }]}
        name="action"
        style={formItemStyle}
      >
        <Radio.Group style={{display: 'flex', flexDirection:'column', width: 'max-content'}}>
          {Object.entries(filterOptions).map(([label, value]) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="value"
        label={<div style={labelStyle}>Value</div>}
        labelCol={labelProps}
        className="mb-3"
        style={formItemStyle}
      >
        <InputNumber
          required={true}
          size="large"
          style={{width: "100%"}}
        />
      </Form.Item>
      <Space style={buttons}>
        <Button size="small" type="text" onClick={() => close()}>
            <CloseCircleFilled/>
            Close
        </Button>
        <Button
                size="small"
                className="d-flex align-items-center"
                onClick={handleFilterClear}
            >
                <DeleteFilled/>
                Clear
        </Button>
        <Button
                size="small"
                htmlType="submit"
                type="primary"
                className="ml-2 d-flex align-items-center"
            >
                <FilterFilled/>
                Filter
        </Button>
      </Space>
    </Form>
)
}