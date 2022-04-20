import { gql, useQuery } from '@apollo/client';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useGetProductsQuery, useMeQuery } from '../../graphql/generated/graphql';
import { getServerPageGetProducts, ssrGetProducts } from '../../graphql/generated/page';
import { withApollo } from '../../lib/withApollo';

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id,
      title
    }
  }
`

function Home({data}) {

    const { user } = useUser();
    const { data: me } = useMeQuery();
    //const { data, loading, error} = useGetProductsQuery();

    return (
        <div>
            <h1>Hello World</h1>
            <pre>
              {JSON.stringify(me, null, 2)}
            </pre>
            {/* <pre>
              {JSON.stringify(data.products, null, 2)}
            </pre> */}
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>

        </div>
    )

}


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {

    //return getServerPageGetProducts(null, ctx)
    return {
      props: {}
    }

  }
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);