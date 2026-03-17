import type { KeyPrefix } from "i18next";
import { type UseTranslationOptions, useTranslation } from "react-i18next";
import type { CONTENT_KEYS } from "@/services/content/i18n";

export const useContent = <
	Namespace extends CONTENT_KEYS = "general",
	KPrefix extends KeyPrefix<Namespace> = undefined,
>(
	namespace: Namespace = "general" as Namespace,
	options?: UseTranslationOptions<KPrefix>,
) => {
	return useTranslation(namespace, options);
};
