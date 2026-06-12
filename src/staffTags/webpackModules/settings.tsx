import { CustomComponentProps } from "@moonlight-mod/types/coreExtensions/moonbase";
import TrashIcon from "@moonlight-mod/wp/discord/modules/icons/web/TrashIcon";
import PanelButton from "@moonlight-mod/wp/discord/components/common/PanelButton";
import staffTags$ChevronLargeUpIcon from "@moonlight-mod/wp/discord/modules/icons/web/staffTags$ChevronLargeUpIcon";
import staffTags$ChevronLargeDownIcon from "@moonlight-mod/wp/discord/modules/icons/web/staffTags$ChevronLargeDownIcon";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import { cardHeader } from "@moonlight-mod/wp/discord/modules/guild_settings/web/AppCard.css";
import { marginBottom8, marginTop20 } from "@moonlight-mod/wp/discord/styles/shared/Margins.css";
import Flex from "@moonlight-mod/wp/discord/uikit/Flex";
import TextInput from "@moonlight-mod/wp/discord/uikit/TextInput";
import { Button } from "@moonlight-mod/wp/discord/uikit/legacy/Button";
import Moonbase from "@moonlight-mod/wp/moonbase_moonbase";
import React, { useMemo } from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import { BLURPLE, defaultConfig, iconComponent, Icons, ColorSwatch } from "@moonlight-mod/wp/staffTags_common";
import { Tag } from "staffTags/types";
import FieldSet from "@moonlight-mod/wp/discord/design/components/Form/web/FieldSet";
import Card from "@moonlight-mod/wp/discord/components/common/Card";
import ManaFormSwitch from "@moonlight-mod/wp/discord/design/components/Switch/web/ManaFormSwitch";

const { getGuildPermissionSpecMap } = spacepack.findByCode("getGuildPermissionSpecMap:")[0].exports.A;
const SearchableSelect: React.FunctionComponent<any> = Object.values(
	spacepack.findByCode('??"single"===')[0].exports
).find((prop) => prop instanceof Function && prop.toString().includes('??"single"===')) as any;

export default function TagsSettingsComponent({
	value: tags = defaultConfig(),
	setValue
}: Omit<CustomComponentProps, "value"> & { value: Tag[] }) {
	const onChange = () => setValue(tags);

	return (
		<FieldSet label="Tags" className={marginTop20}>
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
		</FieldSet>
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
				<ManaFormSwitch
					label="Use role color"
					checked={tag.useRoleColor}
					onChange={(value) => {
						tag.useRoleColor = value;
						onChange();
					}}
				/>
				<FieldSet label={tag.useRoleColor ? "Fallback Color" : "Color"} className={marginTop20}>
					{ColorSwatch && <ColorSwatch
						color={tag.color}
						onChange={(value) => {
							tag.color = value;
							onChange();
						}}
						showEyeDropper={true}
					/>}
				</FieldSet>
				<p 
					className={marginTop20}
					style={{ display: tag.useRoleColor ? undefined : "none" }}
				>
					This will only be used for the Text style when there is no role color.
				</p>
				<FieldSet label="Icon" className={marginTop20}>
					<TagIconSelect
						value={tag.icon}
						setValue={(value) => {
							tag.icon = value;
							onChange();
						}}
					/>
				</FieldSet>
				<p className={marginTop20}>
					This will only show for the Icon style.
				</p>
				<FieldSet label="Permissions" className={marginTop20}>
					<TagPermissionsSelect
						value={tag.permissions}
						setValue={(value) => {
							console.log(value);
							tag.permissions = value;
							onChange();
						}}
					/>
				</FieldSet>
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
			formatOption={(opt) => ({
				...opt,
				id: opt.value,
			})}
			value={value}
			onSelectionChange={setValue}
			selectionMode="multiple"
			placeholder="Select permissions"
		/>
	);
}

function TagIconSelect({
	value,
	setValue,
}: {
	value: Tag["icon"];
	setValue: (value: Tag["icon"]) => void;
}) {
	console.log("current icon " + value);
	return (
		<SearchableSelect
			options={Object.entries(Icons).map(([key, value]) => ({
				value: key,
				label: value.displayName,
			}))}
			formatOption={(opt) => ({
				...opt,
				id: opt.value,
				leading: iconComponent(opt.value),
			})}
			value={value}
			onSelectionChange={setValue}
			selectionMode="single"
			placeholder="Select an icon"
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
