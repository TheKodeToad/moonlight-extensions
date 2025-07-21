export function inlineRequire(module: string): Record<string, string> {
	const base = `require(${JSON.stringify(module)})`;

	return new Proxy(
		{},
		{
			get(_, prop) {
				if (typeof prop === "symbol") {
					throw new Error("Symbol access is not supported for inlineRequire");
				}

				return `${base}[${JSON.stringify(prop)}]`;
			}
		}
	);
}
