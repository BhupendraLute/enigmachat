"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

type SidebarTabPropsType = {
	icon: string;
	title: string;
	onClickTab?: () => void;
	action?: boolean;
	isSidebarExpanded?: boolean;
};

const SidebarTab = ({
	icon,
	title,
	action = false,
	isSidebarExpanded = true,
}: SidebarTabPropsType) => {
	
	return (
		<li className="flex items-center gap-2 hover:bg-slate-600 py-1 px-2 rounded-full cursor-pointer transition-all duration-200 relative group">
			<Image
				src={icon}
				alt="tab-icon"
				width={18}
				height={18}
				className="w-5 h-5"
			/>{" "}
			{isSidebarExpanded && (
				<span className="truncate" >
					{title}
				</span>
			)}
		</li>
	);
};

export default SidebarTab;
