import React from "react";
import ReactDOM from "react-dom";
import { Debug, Form, useField } from "amiable-forms";
import { Input, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const Binary = ({ name }) => {
  const { setValue, value } = useField({ name, emptyValue: 0 });

  const setBit = bit => setValue(value | (1 << bit), { touch: true });
  const resetBit = bit => setValue(value & ~(1 << bit), { touch: true });
  const hasBit = bit => (value >> bit) % 2 !== 0;

  const update = (bit, value) => (value ? setBit(bit) : resetBit(bit));

  return (
    <div>
      {new Array(16).fill(undefined).map((_, i) => {
        const u = ev => update(i, ev.target.checked);
        return (
          <input key={i} type="checkbox" checked={hasBit(i)} onChange={u} />
        );
      })}
      {value}
    </div>
  );
};

const NumberInput = ({ name, validators }) => {
  const { value, setValue } = useField({ name, validators, emptyValue: 0 });

  return (
    <div>
      <Input
        type="text"
        name={name}
        value={value + ""}
        onChange={ev => {
          const num = +ev.target.value;
          if (!num && num !== 0) return;
          setValue(num, { touch: true });
        }}
      />
    </div>
  );
};

const TestForm = () => (
  <Container>
    <h1>amiable-forms</h1>
    <h2>Custom Input Example</h2>
    <Form initialValues={{ binary: 0 }}>
      <NumberInput name="binary" />
      <Binary name="binary" />
      <Debug />
    </Form>
  </Container>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<TestForm />, rootElement);
