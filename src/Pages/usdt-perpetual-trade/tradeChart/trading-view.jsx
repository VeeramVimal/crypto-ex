import React from 'react';
const TVChartContainer = React.lazy(() => import("./TVChartContainer"));

const TradingView = (props) => {
  return (
    <TVChartContainer {...props} />
  );
}
export default TradingView;