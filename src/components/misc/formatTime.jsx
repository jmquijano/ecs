const time2DateTime = (time) => {
    // Format time into a dummy date, to conform with DatePicker's selected format
    time = time ?? (new Date()).toLocaleTimeString();
    return ((new Date('01 Jan 1970 ' + time)));
}

export { time2DateTime }