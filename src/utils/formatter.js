export const formatIdleNum = (num) => {
    if (num < 1000) return Math.floor(num).toString();
    const suffixes = ["", "K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
    const suffixNum = Math.floor(Math.log10(num) / 3);
    if (suffixNum >= suffixes.length) return num.toExponential(2);
    const shortValue = (num / Math.pow(1000, suffixNum)).toFixed(1);
    return shortValue + suffixes[suffixNum];
};
