import Image from "next/image";
import React from "react";

type SidebarTabPropsType = {
	icon: string;
	title: string;
	onClickTab?: () => void;
	action?: boolean;
};

const SidebarTab = ({ icon, title, action = false }: SidebarTabPropsType) => {
	return (
		<li className="flex items-center gap-2 bg-gray-700 hover:bg-slate-600 py-1 px-2 rounded-full cursor-pointer transition-all duration-200">
			<Image src={icon} alt="tab-icon" width={18} height={18} />{" "}
			<span className="truncate">{title}</span>
			{action && (
				<div className="flex items-center justify-center hover:bg-slate-800 py-2 px-3 rounded-full">
					<Image
						src={"/svg/action-icon.svg"}
						alt="action-icon"
						width={5}
						height={5}
					/>
				</div>
			)}
		</li>
	);
};

export default SidebarTab;
