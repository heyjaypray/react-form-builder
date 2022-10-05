import React from "react";
import { ReactFormGenerator } from "react-form-builder2";
import { get } from "../components/requests";

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

Registry.register("MyInput", MyInput);
Registry.register("TestComponent", TestComponent);

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
];

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    // console.log(`Demobar: `, props);
    this.state = {
      data: props.data,
      answers: props.answers,
      roPreviewVisible: props.roPreviewVisible,
    };
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      roPreviewVisible: false,
    });
  }

  render() {
    const { answers, data } = this.state;

    let roModalClass = "modal ro-modal";
    if (this.state.roPreviewVisible) {
      roModalClass += " show d-block";
    }

    return (
      <div className="clearfix" style={{ margin: "10px", width: "70%" }}>
        <h4 className="float-left">Preview</h4>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={this.showRoPreview.bind(this)}
        >
          Read Only Form
        </button>
        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={answers}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    read_only={true}
                    variables={this.props.variables}
                    hide_actions={true}
                    toolbarItems={items}
                    data={data}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// eslint-disable-next-line func-names
Demobar.getInitialProps = async function ({ req }) {
  const protocol = req.headers.referer.split("://")[0];
  const hostUrl = `${protocol}://${req.headers.host}`;
  const url = `${hostUrl}/api/formdata`;
  const getUrl = `${hostUrl}/api/form`;
  const answers = await get(getUrl);
  const data = await get(url);
  return {
    data,
    answers,
    roPreviewVisible: true,
  };
};
