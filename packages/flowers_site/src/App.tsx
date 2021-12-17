import React, {FC} from 'react';
import { Layout } from 'antd';
import { Typography } from 'antd';

import './App.css';

import { AppRoutes } from './Router';

const App: FC = () => {
    const { Header, Content } = Layout;
    const { Title } = Typography;
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Title level={1} style={{ color: '#fff' }}>Flowers</Title>
            </Header>
            <Content style={{ height: '100%' }}>
                <AppRoutes/>
            </Content>
        </Layout>
    );
}

export default App;
