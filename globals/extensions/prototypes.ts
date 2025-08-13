String.prototype.toCapitalize = function(): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
}