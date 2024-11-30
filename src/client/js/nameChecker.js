const checkForName = (inputText) => {
    console.log("::: Running checkForName :::", inputText);
    const names = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];
    return names.includes(inputText);
};

export { checkForName };
