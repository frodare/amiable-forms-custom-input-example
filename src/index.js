import React from "react";
import ReactDOM from "react-dom";
import { Form, useField } from "amiable-forms";
import { Input, Container, ButtonGroup, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const Binary = ({ name }) => {
  const { setValue, value } = useField({ name, parse: toNum, format });

  const setBit = bit => setValue(value | (1 << bit), { touch: true });
  const resetBit = bit => setValue(value & ~(1 << bit), { touch: true });
  const hasBit = bit => (value >> bit) % 2 !== 0;
  const update = (bit, value) => (value ? setBit(bit) : resetBit(bit));

  return (
    <ButtonGroup className="py-3">
      {new Array(8).fill(undefined).map((_, i) => {
        const on = hasBit(i);
        return (
          <Button
            key={i}
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

const toNum = s => {
  const num = +s;
  return num ? num : 0;
};

const format = n => n || 0;

const NumberInput = ({ name, validators }) => {
  const { inputProps, value, setValue } = useField({
    name,
    validators,
    parse: toNum,
    format
  });
  const onKeyDown = ev => {
    switch (ev.which) {
      case 38:
      case 107:
        ev.preventDefault();
        return setValue(value + 1);
      case 40:
      case 109:
        ev.preventDefault();
        return setValue(value - 1);
      default:
        return;
    }
  };
  return <Input className="py-3" {...inputProps} onKeyDown={onKeyDown} />;
};

const TestForm = () => (
  <Container>
    <h1>amiable-forms</h1>
    <p>
      Example of a custom input created for amiable-forms used to set a number
      in a binary fashion.
    </p>
    <Form>
      <Binary name="binary" />
      <NumberInput name="binary" />
    </Form>
  </Container>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<TestForm />, rootElement);
