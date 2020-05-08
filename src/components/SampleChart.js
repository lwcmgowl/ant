import React from 'react';
import {Chart} from '@antv/g2';

class SampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    // G2 初始化图形代码
    this.chart = new Chart({
      // this.containerRef.current 即为引用
      container: this.containerRef.current,
      width: 450,
      height: 300
    });

    // 下文会介绍
    this.refreshChart();
  }

  componentDidUpdate() {
    this.refreshChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  refreshChart = () => {
    // 接收 data 属性作为数据源
    this.chart.data(this.props.data);
    // 此处为硬编码，配置源自 G2 官方示例： https://github.com/antvis/g2
    // 实际开发中需要封装，推荐直接使用 BizCharts。
    this.chart.interval().position('genre*sold').color('genre');
    this.chart.render();
  };

  render() {
    return (
      <div ref={this.containerRef} />
    );
  }
}

export default SampleChart;