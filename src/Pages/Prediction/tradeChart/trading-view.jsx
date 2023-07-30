import React from 'react';
import TVChartContainer from './TVChartContainer';
// const TVChartContainer = React.lazy(() => import("./TVChartContainer"));

const TradingView = (props) => {
  return (
    <TVChartContainer {...props} />
  );
}
export default TradingView;