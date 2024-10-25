#!/bin/bash

set -e

echo "==== Checking if Jenkins and Java are installed ===="

if ! systemctl status jenkins >/dev/null 2>&1; then
    echo "Jenkins is not installed or not running. Please install Jenkins and try again."
    exit 1
fi

if ! java -version >/dev/null 2>&1; then
    echo "Java is not installed. Please install Java and try again."
    exit 1
fi

echo "==== Jenkins and Java found! Proceeding with installation ===="

echo "==== Updating package list ===="
sudo apt update -y

CHROMEDRIVER_VERSION="130.0.6723.69"
echo "==== Downloading ChromeDriver version $CHROMEDRIVER_VERSION ===="
curl -O https://storage.googleapis.com/chrome-for-testing-public/$CHROMEDRIVER_VERSION/linux64/chromedriver-linux64.zip

if ! command -v unzip >/dev/null 2>&1; then
    echo "==== 'unzip' not found. Installing unzip ===="
    sudo apt install -y unzip
else
    echo "==== 'unzip' is already installed ===="
fi

echo "==== Unzipping ChromeDriver ===="
unzip chromedriver-linux64.zip

echo "==== Moving ChromeDriver to /usr/local/bin ===="
sudo mv ./chromedriver-linux64/chromedriver /usr/local/bin/

echo "==== Verifying ChromeDriver installation ===="
chromedriver --version

echo "==== Cleaning up ChromeDriver zip ===="
rm -rf chromedriver-linux64.zip

echo "==== Downloading Google Chrome ===="
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

echo "==== Installing Google Chrome ===="
sudo apt install ./google-chrome-stable_current_amd64.deb -y

echo "==== Cleaning up Google Chrome .deb file ===="
rm -rf google-chrome-stable_current_amd64.deb

echo "==== Updating package list again ===="
sudo apt update -y

echo "==== Installing required dependencies for headless Chrome ===="
sudo apt install -y \
  libx11-dev libnss3 libx11-xcb1 \
  libxcomposite1 libxcursor1 libxi6 libxtst6 \
  libxrandr2 libxss1 libglib2.0-0

sudo apt install -y libasound2-plugins libasound2-data

echo "==== Installation complete! All dependencies are installed. ===="
