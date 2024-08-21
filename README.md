# Building a Dapp with Nodit

This tutorial will guide you through creating a simple Dapp using Nodit, leveraging [Aptos Lab's boilerplate](https://aptos.dev/en/build/create-aptos-dapp/templates/boilerplate).
You can customize and adapt this template to fit your project needs!

## Prerequisites

Before starting this tutorial, please ensure you have completed the followings:

1. [Node.js](https://nodejs.org/en/download/package-manager)
   - version >= v20
   - Recommended version: latest LTS
2. Nodit project
   - [Sign up for Nodit](https://id.lambda256.io/signup)
   - Create your project. (The first project will be created automatically upon completing the onboarding process.)
   - Ensure your project is connected to the Aptos Nodes (Mainnet and Testnet).

## Getting Started

Follow these steps to set up your Dapp with Nodit:

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/nodit-demo-aptos-indexer-api.git
cd nodit-demo-aptos-indexer-api
```

### 2. Install Dependencies

Navigate to the project directory and install the required packages:

```sh
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and set up the following environment variables:

```sh
touch .env
```

In the .env file, add:

```sh
PROJECT_NAME=your-dapp-name
VITE_APP_NETWORK=mainnet # or testnet
VITE_API_KEY=your-nodit-api-key
```

Replace `your-dapp-name` and `your-nodit-api-key` with your actual project name and API key.

### 4. Run the Development Server

Start the development server to see your Dapp in action:

```
npm run dev
```

### 5. Explore the Dapp

After running the development server, open your browser and go to `http://localhost:PORT_NUM`. You can now interact with the Dapp and explore its functionalities.

## Customizing Your Dapp

This boilerplate provides a great starting point for your Dapp. You can customize it further to meet your specific project requirements. Consider exploring the following:

- Front-end Design: Customize the UI to match your brand.
- Smart Contracts: Integrate your own smart contracts or modify existing ones.
- API Integrations: Use the Nodit Indexer API to fetch and display blockchain data.

## Additional Resources

- [Nodit Documentation](https://developer.nodit.io/docs/)
- [Aptos Labs](https://aptos.dev/en)
- [Aptos SDK](https://aptos.dev/en/build/sdks)
- [Aptos create-aptos-dapp](https://aptos.dev/en/build/create-aptos-dapp)

## Contributing

If you’d like to contribute to this project, please fork the repository and create a pull request. We welcome all contributions!
