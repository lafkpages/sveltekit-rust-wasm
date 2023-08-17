FROM mcr.microsoft.com/vscode/devcontainers/rust:0-1

RUN apt update

# Install pkg-config and cURL
RUN apt install -y pkg-config curl

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"

# Install Rust tools
RUN cargo install cargo-watch

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Install Node LTS
RUN nvm install --lts

# Install PNPM
RUN npm i -g pnpm

# Setup project
RUN pnpm run setup
