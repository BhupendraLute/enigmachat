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
	isSidebarExpanded = true,
}: SidebarTabPropsType) => {
	
	return (

		<button className="w-full flex justify-start items-center text-base gap-2 py-1 px-2  border border-gray-500 hover:bg-slate-600 rounded-full cursor-pointer">
			<Image
				src={icon}
				alt="tab-icon"
				width={16}
				height={16}
				className="w-5 h-5"
			/>{" "}
			{isSidebarExpanded && (
				<span className="truncate" >
					{title}
				</span>
			)}
		</button>
		
	);
};

export default SidebarTab;
