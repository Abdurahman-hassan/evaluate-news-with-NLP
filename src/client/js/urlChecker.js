const checkForURL = (inputText) => {
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return urlPattern.test(inputText);
};

export { checkForURL };
