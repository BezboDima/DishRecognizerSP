export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Ingredient Lens",
	description: "Find recipes for food you've seen.",
	navItems: [
	{
		label: "Home",
		href: "/",
	},
    {
		label: "Docs",
		href: "/docs",
    },
    {
		label: "Popular Dishes",
		href: "/popular",
    },
    {
		label: "Image Upload",
		href: "/image_upload",
    },
    {
		label: "About",
		href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Docs",
			href: "/docs",
		},
		{
			label: "Popular Dishes",
			href: "/popular",
		},
		{
			label: "Image Upload",
			href: "/image_upload",
		},
		{
			label: "About",
			href: "/calendar",
		},
	],
	links: {
		github: "https://github.com/BezboDima/IngredientLens.git",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    
	},
};
