import { Button, Row, TextView, contentView } from "tabris";

const App = {
  start: ({ count, onIncrement, onDecrement }) => {
    contentView.append(
      <$>
        <Row stretchY stretchX centerX centerY spacing={20} height={200}>
          <Button center onSelect={onIncrement}>
            Increment
          </Button>
          <TextView centerX centerY font="24px" text={count} />
          <Button center onSelect={onDecrement}>
            Decrement
          </Button>
        </Row>
      </$>
    );
  },
  setCount: ({ count }) => {
    $(TextView).only().text = count;
  },
};

export default App;
