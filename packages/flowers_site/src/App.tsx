import React, {FC} from 'react';
import { Layout } from 'antd';

import './App.css';

import { AppRoutes } from './Router';

const App: FC = () => {
    const { Header, Footer, Content } = Layout;
    return (
        <Layout>
            <Header>Header</Header>
            <Content>
                <AppRoutes/>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}

export default App;
