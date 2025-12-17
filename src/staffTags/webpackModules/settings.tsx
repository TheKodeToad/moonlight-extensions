import { CustomComponentProps } from "@moonlight-mod/types/coreExtensions/moonbase";
import {
	default as componentsCommon,
	Card,
	FormSwitch,
	FormItem,
	FormText,
	staffTags$ChevronLargeDownIcon,
	staffTags$ChevronLargeUpIcon,
	TrashIcon
} from "@moonlight-mod/wp/discord/components/common/index";
import PanelButton from "@moonlight-mod/wp/discord/components/common/PanelButton";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import { cardHeader } from "@moonlight-mod/wp/discord/modules/guild_settings/web/AppCard.css";
import { marginBottom8, marginTop20 } from "@moonlight-mod/wp/discord/styles/shared/Margins.css";
import Flex from "@moonlight-mod/wp/discord/uikit/Flex";
import TextInput from "@moonlight-mod/wp/discord/uikit/TextInput";
import { Button } from "@moonlight-mod/wp/discord/uikit/legacy/Button";
import Moonbase from "@moonlight-mod/wp/moonbase_moonbase";
import React, { useMemo } from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { BLURPLE, defaultConfig, iconComponent, Icons } from "@moonlight-mod/wp/staffTags_common";
import { Tag } from "staffTags/types";

const { getGuildPermissionSpecMap } = spacepack.findByCode("getGuildPermissionSpecMap:")[0].exports.Z;
const ColorSwatch: React.FunctionComponent<any> = spacepack.findByCode('.swatch,"aria-label"')[0].exports.Z;
const SearchableSelect: React.FunctionComponent<any> = Object.values(componentsCommon).find(
	(prop) => prop instanceof Function && prop.toString().includes("SearchableSelect")
) as any;

export default function TagsSettingsComponent({
	value: tags = defaultConfig(),
	setValue
}: Omit<CustomComponentProps, "value"> & { value: Tag[] }) {
	const onChange = () => setValue(tags);

	return (
		<FormItem title="Tags" className={marginTop20}>
			<Flex direction={Flex.Direction.VERTICAL} style={{ gap: 16 }} className={marginBottom8}>
				{tags.map((tag, i) => (
					<TagSettingsComponent
						key={i}
						tag={tag}
						canMoveUp={i > 0}
						canMoveDown={i < tags.length - 1}
						onChange={onChange}
						onMoveUp={() => {
							tags.splice(i, 1);
							tags.splice(i - 1, 0, tag);
							onChange();
						}}
						onMoveDown={() => {
							tags.splice(i, 1);
							tags.splice(i + 1, 0, tag);
							onChange();
						}}
						onDelete={() => {
							tags.splice(i, 1);
							onChange();
						}}
					/>
				))}
			</Flex>
			<Flex direction={Flex.Direction.HORIZONTAL} style={{ gap: 8 }}>
				<Button
					size={Button.Sizes.SMALL}
					color={Button.Colors.GREEN}
					onClick={() => {
						tags.push({
							label: "",
							icon: "shield",
							useRoleColor: false,
							color: BLURPLE,
							permissions: []
						});
						onChange();
					}}
					style={{ flexGrow: 1 }}
				>
					Add a new tag
				</Button>
				<Button size={Button.Sizes.SMALL} color={Button.Colors.RED} onClick={() => setValue(defaultConfig())}>
					Restore Defaults
				</Button>
			</Flex>
		</FormItem>
	);
}

interface TagSettingsProps {
	tag: Tag;
	canMoveUp: boolean;
	canMoveDown: boolean;
	onChange: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
	onDelete: () => void;
}

function TagSettingsComponent({
	tag,
	canMoveUp,
	canMoveDown,
	onChange,
	onMoveUp,
	onMoveDown,
	onDelete
}: TagSettingsProps) {
	return (
		<Card>
			<Flex direction={Flex.Direction.HORIZONTAL} style={{ gap: 8 }} className={cardHeader}>
				<PanelButton
					icon={staffTags$ChevronLargeUpIcon}
					tooltipText={"Move Up"}
					disabled={!canMoveUp}
					onClick={onMoveUp}
				/>
				<PanelButton
					icon={staffTags$ChevronLargeDownIcon}
					tooltipText={"Move Down"}
					disabled={!canMoveDown}
					onClick={onMoveDown}
				/>
				<div style={{ flexGrow: 1 }}>
					<TextInput
						value={tag.label}
						placeholder="Add a label"
						onChange={(value) => {
							tag.label = value;
							onChange();
						}}
					/>
				</div>
				<PanelButton icon={TrashIcon} tooltipText="Remove Tag" onClick={onDelete} />
			</Flex>
			<div style={{ padding: 16 }}>
				<FormSwitch
					label="Use role color"
					checked={tag.useRoleColor}
					onChange={(value) => {
						tag.useRoleColor = value;
						onChange();
					}}
				/>
				<FormItem title={tag.useRoleColor ? "Fallback Color" : "Color"} className={marginTop20}>
					<span></span>
					<ColorSwatch
						color={tag.color}
						onChange={(value) => {
							tag.color = value;
							onChange();
						}}
						showEyeDropper={true}
					/>
				</FormItem>
				<FormText
					// @ts-expect-error Import not available
					type={"description"}
					style={{ display: tag.useRoleColor ? undefined : "none" }}
				>
					This will only be used for the Text style when there is no role color.
				</FormText>
				<FormItem title="Tags" className={marginTop20}>
					<TagIconSelect
						value={tag.icon}
						setValue={(value) => {
							tag.icon = value;
							onChange();
						}}
						className={marginBottom8}
					/>
				</FormItem>
				<FormText
					// @ts-expect-error Import not available
					type={"description"}
				>
					This will only show for the Icon style.
				</FormText>
				<FormItem title="Permissions" className={marginTop20}>
					<TagPermissionsSelect
						value={tag.permissions}
						setValue={(value) => {
							tag.permissions = value;
							onChange();
						}}
					/>
				</FormItem>
			</div>
		</Card>
	);
}

function TagPermissionsSelect({
	value,
	setValue
}: {
	value: Tag["permissions"];
	setValue: (value: Tag["permissions"]) => void;
}) {
	const permissionOptions = useMemo(() => createPermissionOptions(), []);

	return (
		<SearchableSelect
			options={permissionOptions}
			value={value}
			onChange={setValue}
			multi={true}
			placeholder="Select permissions"
		/>
	);
}

function TagIconSelect({
	value,
	setValue,
	className
}: {
	value: Tag["icon"];
	setValue: (value: Tag["icon"]) => void;
	className: string;
}) {
	return (
		<SearchableSelect
			options={Object.entries(Icons).map(([key, icon]) => ({ label: icon.displayName, value: key }))}
			value={value}
			onChange={setValue}
			renderOptionPrefix={(option) => {
				if (option == null) return undefined;

				const Icon = iconComponent(option.value);

				if (Icon === undefined) return undefined;

				return <Icon size="sm" />;
			}}
			placeholder="Select an icon"
			className={className}
		/>
	);
}

function createPermissionOptions() {
	const result: { label: string; value: any }[] = [{ label: "Server Owner", value: "OWNER" }];

	const specMap = getGuildPermissionSpecMap?.({}); // HACK: Passing empty object seems to work, presumably this is just to change the result based on experiments?

	for (const key in Permissions) {
		// No point showing this
		if (key === "USE_CLYDE_AI") continue;

		const value = Permissions[key];
		const spec = specMap?.[String(value)];
		result.push({
			label: spec?.title ?? key,
			value: key
		});
	}

	return result;
}

Moonbase.registerConfigComponent("staffTags", "tags", TagsSettingsComponent);
