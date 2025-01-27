import { CustomComponentProps } from "@moonlight-mod/types/coreExtensions/moonbase";
import {
	Button,
	Card,
	ChevronLargeDownIcon,
	ChevronLargeUpIcon,
	FormTitle,
	multiSelect,
	Select,
	TextInput,
	TrashIcon,
	useVariableSelect
} from "@moonlight-mod/wp/discord/components/common/index";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import React from "@moonlight-mod/wp/react";
import { Permissions } from "@moonlight-mod/wp/discord/Constants";
import Moonbase from "@moonlight-mod/wp/moonbase_moonbase";
import Flex from "@moonlight-mod/wp/discord/uikit/Flex";
import { marginTop20 } from "@moonlight-mod/wp/discord/styles/shared/Margins.css";
import PanelButton from "@moonlight-mod/wp/discord/components/common/PanelButton";
import { TagData } from "staffTags/types";

const { getGuildPermissionSpecMap } = spacepack.findByCode("getGuildPermissionSpecMap:")[0].exports.Z;

export default function TagsSettings({
	value: tags,
	setValue
}: Omit<CustomComponentProps, "value"> & { value: TagData[] }) {
	const onChange = () => setValue(tags);

	const children = tags.map((tag, i) => (
		<TagSettings
			key={i} // does nothing because the component is always re-rendered :troll:
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
	));

	children.push(
		<Button
			size={Button.Sizes.SMALL}
			color={Button.Colors.GREEN}
			onClick={() => {
				tags.push({
					label: "",
					permissions: []
				});
				onChange();
			}}
		>
			Add a new tag
		</Button>
	);

	return (
		<Flex direction={Flex.Direction.VERTICAL} style={{ gap: 16 }}>
			{children}
		</Flex>
	);
}

function TagSettings({
	tag,
	canMoveUp,
	canMoveDown,
	onChange,
	onMoveUp,
	onMoveDown,
	onDelete
}: {
	tag: TagData;
	canMoveUp: boolean;
	canMoveDown: boolean;
	onChange: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
	onDelete: () => void;
}) {
	const permissionOptions = createPermissionOptions();

	return (
		<Card style={{ padding: 16 }}>
			<Flex direction={Flex.Direction.HORIZONTAL} style={{ gap: 8 }}>
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
				<span style={{ marginLeft: "auto" }} />
				<PanelButton icon={TrashIcon} tooltipText="Remove Tag" onClick={onDelete} />
			</Flex>
			<div className={marginTop20}>
				<FormTitle>Label</FormTitle>
				<TextInput
					value={tag.label}
					onChange={(value) => {
						tag.label = value;
						onChange();
					}}
				/>
			</div>
			<div className={marginTop20}>
				<FormTitle>Permissions</FormTitle>
				<Select
					options={permissionOptions}
					{...useVariableSelect({
						value: new Set(tag.permissions),
						onChange(value) {
							tag.permissions = Array.from(value) as any;
							onChange();
						},
						onSelectInteraction: multiSelect
					})}
				/>
			</div>
		</Card>
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

Moonbase.registerConfigComponent("customUserTags", "tags", TagsSettings);
