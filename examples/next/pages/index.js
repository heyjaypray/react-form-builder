import React from "react";
import FormBuilder, { Registry } from "react-form-builder2";
import DemoBar from "../components/demobar";
import Dustbin from "../components/Dustbin";

class MultiColumnRow extends React.Component {
  render() {
    const {
      controls,
      data,
      editModeOn,
      getDataById,
      setAsChild,
      removeChild,
      seq,
      className,
      index,
    } = this.props;
    const { childItems, pageBreakBefore } = data;
    let baseClasses = "SortableItem rfb-item";
    if (pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <div>
          <div className="row">
            {childItems.map((x, i) => (
              <div key={`${i}_${x || "_"}`} className={className}>
                {controls ? (
                  controls[i]
                ) : (
                  <Dustbin
                    style={{ width: "100%" }}
                    data={data}
                    accepts={accepts}
                    items={childItems}
                    col={i}
                    parentIndex={index}
                    editModeOn={editModeOn}
                    _onDestroy={() => removeChild(data, i)}
                    getDataById={getDataById}
                    setAsChild={setAsChild}
                    seq={seq}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const TestComponent = () => <h2>Hello</h2>;

const MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return (
    <input
      ref={ref}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
});

const SixColumnRow = ({ data, class_name, ...rest }) => {
  const className = class_name || "col";
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null, null, null, null, null];
    data.isContainer = true;
  }
  return <MultiColumnRow {...rest} className={className} data={data} />;
};

Registry.register("MyInput", MyInput);
Registry.register("TestComponent", TestComponent);
Registry.register("SixColumnRow", SixColumnRow);

const items = [
  {
    key: "Header",
  },
  {
    key: "TextInput",
  },
  {
    key: "TextArea",
  },
  {
    key: "RadioButtons",
  },
  {
    key: "Checkboxes",
  },
  {
    key: "Image",
  },
  {
    key: "TestComponent",
    element: "CustomElement",
    component: TestComponent,
    type: "custom",
    field_name: "test_component",
    name: "Something You Want",
    icon: "fa fa-cog",
    static: true,
    props: { test: "test_comp" },
    label: "Label Test",
  },
  {
    key: "MyInput",
    element: "CustomElement",
    component: MyInput,
    type: "custom",
    forwardRef: true,
    field_name: "my_input_",
    name: "My Input",
    icon: "fa fa-cog",
    props: { test: "test_input" },
    label: "Label Input",
  },
  {
    key: "SixColumnRow",
    element: "CustomElement",
    component: SixColumnRow,
    type: "custom",
    forwardRef: true,
    field_name: "my_input_",
    name: "Six Column Row",
    icon: "fa fa-cog",
    props: { test: "test_input" },
    label: "Label Input",
  },
];

// Form Data
const url = "/api/formdata";
const saveUrl = "/api/formdata";
const postUrl = "/api/form";

class Index extends React.Component {
  render() {
    return (
      <div>
        <DemoBar postUrl={postUrl} toolbarItems={items} />

        <FormBuilder.ReactFormBuilder
          url={url}
          saveUrl={saveUrl}
          toolbarItems={items}
        />
      </div>
    );
  }
}

export default Index;
