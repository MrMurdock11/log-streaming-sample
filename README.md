# Log Streaming Sample

This project demonstrates a log-streaming API based on the Server-Sent Events (SSE) standard, complemented by a React UI for real-time log visualization. It's designed to showcase how to implement a basic log streaming system using modern web technologies.

## Features

- **SSE-based Log Streaming API**: Utilizes the SSE standard for efficient, real-time log streaming.
- **React UI**: A simple yet powerful user interface to display streaming logs.
- **Log Generation Tool**: Simulates log generation for demonstration purposes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (Preferably the latest stable version)
- npm

### Installation

1. Clone the repository:

```shell
git clone https://github.com/yourusername/log-streaming-sample.git
```

2. Install project dependencies:

```shell
cd log-streaming-sample
npm install
```

### Running the Application

This project uses concurrently to run the UI, API, and log generator simultaneously:

```shell
npm start
```

This command executes the following:

- Starts the React UI.
- Launches the SSE-based API.
- Runs the log generator tool.

You can also run these components individually using their respective npm run start:\* commands as defined in `package.json`.

### Project Structure

- **apps/ui**: Contains the React application for the user interface.
- **apps/api**: Houses the SSE-based API for log streaming.
- **tools/generator**: Includes a tool for generating sample log data.

## Contributing

We welcome contributions! Please feel free to submit pull requests to the project.

## License

This project is licensed under the ISC License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.
