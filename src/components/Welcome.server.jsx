import {useShopQuery, flattenConnection, Link} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Suspense} from 'react';

function ExternalIcon() {
  return (
    <svg
      className="ml-3"
      width="15"
      height="14"
      viewBox="0 0 15 14"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M8.11963 0.000976562C7.56734 0.000976562 7.11963 0.448692 7.11963 1.00098C7.11963 1.55326 7.56734 2.00098 8.11963 2.00098H10.7054L4.41252 8.29387C4.022 8.68439 4.022 9.31756 4.41252 9.70808C4.80305 10.0986 5.43621 10.0986 5.82674 9.70808L12.1196 3.41519V6.00098C12.1196 6.55326 12.5673 7.00098 13.1196 7.00098C13.6719 7.00098 14.1196 6.55326 14.1196 6.00098V1.00098C14.1196 0.448692 13.6719 0.000976562 13.1196 0.000976562H8.11963Z" />
      <path d="M2.11963 2.00098C1.01506 2.00098 0.119629 2.89641 0.119629 4.00098V12.001C0.119629 13.1055 1.01506 14.001 2.11963 14.001H10.1196C11.2242 14.001 12.1196 13.1055 12.1196 12.001V9.00098C12.1196 8.44869 11.6719 8.00098 11.1196 8.00098C10.5673 8.00098 10.1196 8.44869 10.1196 9.00098V12.001H2.11963V4.00098L5.11963 4.00098C5.67191 4.00098 6.11963 3.55326 6.11963 3.00098C6.11963 2.44869 5.67191 2.00098 5.11963 2.00098H2.11963Z" />
    </svg>
  );
}

function DocsButton({url, label}) {
  return (
    <a
      href={url}
      target="_blank"
      className="bg-white shadow py-2 px-5 rounded-full inline-flex items-center hover:opacity-80"
      rel="noreferrer"
    >
      {label}
      <ExternalIcon />
    </a>
  );
}

function BoxFallback() {
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl text-gray-900 h-60"></div>
  );
}

function StorefrontInfo() {
  const {data} = useShopQuery({query: QUERY, preload: true});
  const shopName = data ? data.shop.name : '';
  const products = data && flattenConnection(data.products);
  const collections = data && flattenConnection(data.collections);
  const totalProducts = products && products.length;
  const totalCollections = collections && collections.length;

  const pluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count === 1 ? '' : suffix}`;
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl text-gray-900">
      <p className="text-md font-medium uppercase mb-4">Connected Storefront</p>
      <h2 className="text-2xl font-bold mb-4">{shopName}</h2>
      <p className="text-md">
        {pluralize(totalProducts, 'Product')}
        {', '}
        {pluralize(totalCollections, 'Collection')}
      </p>
      {totalProducts === 0 && totalCollections === 0 && (
        <div className="py-2 px-3 bg-red-100 text-md">
          Use the{' '}
          <a
            href="https://shopify.dev/apps/tools/cli/getting-started"
            className="text-primary font-mono font-bold underline"
            target="_blank"
            rel="noreferrer"
          >
            Shopify CLI
          </a>{' '}
          to populate sample products and collections.
        </div>
      )}
      <hr className="my-4" />
      <a
        href="https://shopify.dev/custom-storefronts/hydrogen/getting-started/create#step-2-update-information-about-your-shopify-storefront"
        className="text-md inline-flex items-center text-blue-700 font-medium hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Change your storefront access token
        <ExternalIcon />
      </a>
    </div>
  );
}

function TemplateLinks() {
  const {data} = useShopQuery({query: QUERY, preload: true});
  const products = data && flattenConnection(data.products);
  const collections = data && flattenConnection(data.collections);

  const firstProduct = products && products.length ? products[0].handle : '';
  const firstCollection = collections[0] ? collections[0].handle : '';

  return (
    <div className="bg-white p-12 md:p-12 shadow-xl rounded-xl text-gray-900">
      <p className="text-md font-medium uppercase mb-4">
        Explore the templates
      </p>
      <ul>
        <li className="mb-4">
          <Link
            to={`/collections/${firstCollection}`}
            className="text-md font-medium text-blue-700 hover:underline"
          >
            Collection template
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to={`/products/${firstProduct}`}
            className="text-md font-medium text-blue-700 hover:underline"
          >
            Product template
          </Link>
        </li>
        <li>
          <Link
            to="/error-page"
            className="text-md font-medium text-blue-700 hover:underline"
          >
            404 template
          </Link>
        </li>
      </ul>
    </div>
  );
}

/**
 * A server component that displays the content on the homepage of the Hydrogen app
 */
export default function Welcome() {
  return (
    <div className="text-stone-100 rounded-[40px] -mt-20">
      <div>
        <img
          src="https://uploads-ssl.webflow.com/6101366c480baf4003cb7546/6217596f8fdf68d396d61ae9_CARILLON%5B000-180%5D1402.jpg"
          alt="hero image"
          className=" object-cover"
        />
        <div className="absolute text-center top-40 font-Holtwood text-8xl w-full">
          NEON STORE
        </div>
      </div>

      <div className="bg-[rgb(241,235,230)] h-[70vh] flex flex-col justify-center items-center">
        <span className="text-stone-800 text-7xl text-center font-Holtwood mx-32 mt-40 leading-tight">
          Dal 1781{' '}
          <img
            className="inline -rotate-[10deg] w-36"
            src="https://uploads-ssl.webflow.com/6101366c480baf4003cb7546/62053498da9cb81272b9259a_61fd4034e17de6c416b2b7b2_Storia-1718-2.png"
            alt=""
          />{' '}
          amore e dedizione per la coltivazione e la produzione delle più
          pregiate{' '}
          <img
            className="inline rotate-[10deg] h-28"
            src="https://uploads-ssl.webflow.com/6101366c480baf4003cb7546/620534a2ba351aaca29298a9_61fd403f9d62f0480fb4180a_Storia-1933.png"
            alt=""
          />{' '}
          varietà di olive.
        </span>
        <button className="my-16 block text-stone-800 text-sm border rounded-[50%] border-stone-800 px-6 py-4 hover:text-stone-100 hover:bg-stone-800 hover:scale-110 duration-500">
          LA NOSTRA STORIA
        </button>
      </div>
      <div className="h-[200vh] bg-cover w-full flex flex-col justify-center items-center bg-[url(https://uploads-ssl.webflow.com/6101366c480baf4003cb7546/61923927d187504b657f78bf_Untitled-1.jpg)]">
        <span className="text-stone-800 text-[14rem] text-center leading-[0.8]">
          UN OLIO ANTICO
        </span>
        <img
          className=" h-[40rem] hover:rotate-[4deg] duration-500 cursor-pointer"
          src="https://uploads-ssl.webflow.com/610136a03296734e45ef3756/618542e73e69d6b38e8fce4c_bottiglia-prodotti.png"
          alt=""
        />
        <button className="my-16 block text-stone-800 text-sm border rounded-[50%] border-stone-800 px-6 py-4 hover:text-stone-100 hover:bg-stone-800 hover:scale-110 duration-500">
          ACQUISTA ORA
        </button>
      </div>

      <iframe
        src="https://player.vimeo.com/video/673704701?background=1"
        className="w-full h-screen object-cover"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen=""
      ></iframe>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <Suspense fallback={<BoxFallback />}>
          <StorefrontInfo />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <TemplateLinks />
        </Suspense>
      </div>
    </div>
  );
}

const QUERY = gql`
  query welcomeContent {
    shop {
      name
    }
    products(first: 3) {
      edges {
        node {
          handle
        }
      }
    }
    collections(first: 3) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
