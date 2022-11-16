// Generate a static link from given parameters
export const toLink = (...args: string[]) => {
    let res = "";
    args.forEach((val) => {
        if (val !== undefined) {
            if (val.startsWith("/")) res += val;
            else res = res + "/" + val;
        }
    });
    return res;
}