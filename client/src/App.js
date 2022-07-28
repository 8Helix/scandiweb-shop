import { PureComponent } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/header/Header.js";
import { Routes, Route } from "react-router-dom";
import { ROUTES_CONFIG } from "./config/routes.js";
import Modal from "./components/modal/Modal.js";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(x) {
    this.setState({ openModal: x });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Header
          openModal={this.state.openModal}
          handleModal={this.handleModal}
        />
        <Routes>
          {ROUTES_CONFIG.map((route) => {
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={<Page />} />
            );
          })}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        {this.state.openModal && (
          <Modal
            openModal={this.state.openModal}
            handleModal={this.handleModal}
          />
        )}
      </ApolloProvider>
    );
  }
}

export default App;
