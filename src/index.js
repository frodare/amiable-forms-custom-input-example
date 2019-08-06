import React from "react";
import ReactDOM from "react-dom";
import { Form, useField } from "amiable-forms";
import { Input, Container, ButtonGroup, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const Binary = ({ name }) => {
  const { setValue, value } = useField({ name, emptyValue: 0 });

  const setBit = bit => setValue(value | (1 << bit), { touch: true });
  const resetBit = bit => setValue(value & ~(1 << bit), { touch: true });
  const hasBit = bit => (value >> bit) % 2 !== 0;

  const update = (bit, value) => (value ? setBit(bit) : resetBit(bit));

  return (
    <ButtonGroup block className="py-3">
      {new Array(8).fill(undefined).map((_, i) => {
        const on = hasBit(i);
        return (
          <Button
            color={on ? "primary" : "light"}
            onClick={() => update(i, !on)}
            active={on}
          >
            {i}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

const NumberInput = ({ name, validators }) => {
  const { value, setValue } = useField({ name, validators, emptyValue: 0 });
  return (
    <Input
      className="py-3"
      type="text"
      name={name}
      value={value + ""}
      onChange={ev => {
        const num = +ev.target.value;
        if (!num && num !== 0) return;
        setValue(num, { touch: true });
      }}
    />
  );
};

const TestForm = () => (
  <Container>
    <h1>amiable-forms</h1>
    <p>
      Example of a custom input created for amiable-forms used to set a number
      in a binary fashion.
    </p>
    <Form initialValues={{ binary: 0 }}>
      <Binary name="binary" />
      <NumberInput name="binary" />
    </Form>
  </Container>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<TestForm />, rootElement);
