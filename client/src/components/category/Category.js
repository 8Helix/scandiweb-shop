import { PureComponent } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Card from "./Card";

class Category extends PureComponent {
  render() {
    return (
      <section className="container">
        <h1 className="heading">{this.props.category}</h1>
        <div className="grid">
          {this.props.data.category?.products.map((product) => {
            const price = product.prices.find(
              (item) => item.currency.label === this.props.currency
            );
            return (
              <Card
                hoverable
                price={price}
                product={product}
                key={product.name}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default graphql(
  gql`
    query getByName($input: CategoryInput) {
      category(input: $input) {
        name
        products {
          name
          id
          gallery
          inStock
          prices {
            amount
            currency {
              label
              symbol
            }
          }
        }
      }
    }
  `,
  {
    options: (props) => ({
      variables: {
        input: {
          title: props.category,
        },
      },
    }),
  }
)(Category);
