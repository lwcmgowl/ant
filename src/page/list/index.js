import React from 'react';
import { Table, Button, Form, Input, Modal} from 'antd';
import { connect } from 'dva';
import SampleChart from '../../components/SampleChart';

const namespace = 'cards';

class List extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
    statisticVisible: false,
    id: null
  }
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render(value) {
        return (
          <a href={value}>{value}</a>
        );
      },
    },
    {
      title: '',
      dataIndex: 'statistic',
      render: (_, { id }) => {
        return (
          <Button onClick={() => { this.showStatistic(id); }}>图表</Button>
        );
      },
    },
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList',
    });
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  showStatistic = (id) => {
    this.props.dispatch({
      type: 'cards/getStatistic',
      payload: id,
    });
    this.setState({ id, statisticVisible: true });
  };


  handleOk = e => {
   this.formRef.current.validateFields().then(values => {
    this.props.dispatch({
      type: `${namespace}/addOne`,
      payload: values,
    })
    this.setState({
      visible: false,
    });
   })
  };


  handleCancel = e => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  };

  handleStatisticCancel = () => {
    this.setState({
      statisticVisible: false,
    });
  }

  render() {
    const { visible, statisticVisible, id } = this.state;
    const { cardsList, cardsLoading, statistic } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
        <Modal
          title="新建记录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
            确定
          </Button>,
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
          ]}
        >
          <Form ref={this.formRef}>
            <Form.Item label="名称" name="name" rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="描述" name='desc' rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="链接" name='url' rules={[{type: 'url', required: true}]}>
                <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
        <SampleChart data={statistic[id] ? statistic[id] : []} />
      </Modal>
        <Button onClick={this.showModal}>新建</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList'],
    statistic: state.cards.statistic,
  };
}

export default connect(mapStateToProps)(List);