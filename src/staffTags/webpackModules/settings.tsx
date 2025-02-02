import { CustomComponentProps } from "@moonlight-mod/types/coreExtensions/moonbase";
import Components, {
	Button,
	Card,
	ChevronLargeDownIcon,
	ChevronLargeUpIcon,
	FormTitle,
	SearchableSelect,
	TextInput,
	TrashIcon
} from "@moonlight-mod/wp/discord/components/common/index";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import React, { useMemo } from "@moonlight-mod/wp/react";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import Moonbase from "@moonlight-mod/wp/moonbase_moonbase";
import Flex from "@moonlight-mod/wp/discord/uikit/Flex";
import { marginBottom20, marginBottom8, marginTop20 } from "@moonlight-mod/wp/discord/styles/shared/Margins.css";
import PanelButton from "@moonlight-mod/wp/discord/components/common/PanelButton";
import { Tag } from "staffTags/types";
import { Icons, BLURPLE, defaultConfig as defaultConfig, defaultConfig } from "@moonlight-mod/wp/staffTags_constants";
import { FormText } from "@moonlight-mod/wp/discord/components/common/index";
import { cardHeader } from "@moonlight-mod/wp/discord/modules/guild_settings/web/AppCard.css";

const { getGuildPermissionSpecMap } = spacepack.findByCode("getGuildPermissionSpecMap:")[0].exports.Z;
const ColorSwatch: React.FunctionComponent<any> = spacepack.findByCode('.swatch,"aria-label"')[0].exports.Z;

export default function TagsSettingsComponent({
	value: tags = defaultConfig(),
	setValue
}: Omit<CustomComponentProps, "value"> & { value: Tag[] }) {
	const onChange = () => setValue(tags);

	return (
		<div>
			<FormTitle>Tags</FormTitle>
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
		</div>
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
					icon={ChevronLargeUpIcon}
					tooltipText={"Move Up"}
					disabled={!canMoveUp}
					onClick={onMoveUp}
				/>
				<PanelButton
					icon={ChevronLargeDownIcon}
					tooltipText={"Move Down"}
					disabled={!canMoveDown}
					onClick={onMoveDown}
				/>
				<div style={{ flexGrow: 1 }}>
					<TextInput
						value={tag.label}
						placeholder="Label this tag"
						onChange={(value) => {
							tag.label = value;
							onChange();
						}}
					/>
				</div>
				<PanelButton icon={TrashIcon} tooltipText="Remove Tag" onClick={onDelete} />
			</Flex>
			<div style={{ padding: 16 }}>
				<FormTitle>Color</FormTitle>
				<div className={marginBottom20}>
					<ColorSwatch
						color={tag.color}
						onChange={(value) => {
							tag.color = value;
							onChange();
						}}
					/>
				</div>
				<FormTitle>Icon</FormTitle>
				<FormText className={marginBottom8}>This will only show for the “Icon” style.</FormText>
				<TagIconSelect
					value={tag.icon}
					setValue={(value) => {
						tag.icon = value;
						onChange();
					}}
					className={marginBottom20}
				/>
				<FormTitle>Permissions</FormTitle>
				<TagPermissionsSelect
					value={tag.permissions}
					setValue={(value) => {
						tag.permissions = value;
						onChange();
					}}
					className={marginBottom20}
				/>
			</div>
		</Card>
	);
}

function TagPermissionsSelect({
	value,
	setValue,
	className
}: {
	value: Tag["permissions"];
	setValue: (value: Tag["permissions"]) => void;
	className: string;
}) {
	const permissionOptions = useMemo(() => createPermissionOptions(), []);

	return (
		<SearchableSelect
			options={permissionOptions}
			value={value}
			onChange={setValue}
			multi={true}
			placeholder="Select permissions"
			className={className}
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
				if (option === null) return undefined;

				const Icon = Components[Icons[option.value]?.discordName?.concat("Icon")];

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

	const specMap = getGuildPermissionSpecMap({}); // HACK: Passing empty object seems to work, presumably this is just to change the result based on experiments?

	for (const key in Permissions) {
		// No point showing this
		if (key === "USE_CLYDE_AI") continue;

		const value = Permissions[key];
		const spec = specMap[String(value)];
		result.push({
			label: spec?.title ?? key,
			value: key
		});
	}

	return result;
}

Moonbase.registerConfigComponent("staffTags", "tags", TagsSettingsComponent);
