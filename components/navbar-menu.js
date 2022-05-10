import React from "react";
import dynamic from "next/dynamic";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { indigo, mauve, red, pink, gray } from "@radix-ui/colors";
import Link from "next/link";
const ProfileBadge = dynamic(() => import("./ProfileBadge"));

const Gravatar = dynamic(() => import("react-gravatar"), { ssr: false });
const LocaleSwitcher = dynamic(() => import("./Locale/LocaleSwitcher"), {
  ssr: true,
});

import { FormattedMessage, useIntl } from "react-intl";
const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const StyledMenu = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  width: "auto",
  zIndex: 1,
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  // backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
});

const itemStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  //   color: indigo.indigo11,
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&:hover": { backgroundColor: indigo.indigo3, color: indigo.indigo11 },
};
const itemButtonStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  marginLeft: "6px",
  color: gray.gray1,
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  "&:hover": { backgroundColor: indigo.indigo9, color: gray.gray1 },
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
});

const CustomTrigger = ({ children, to, ...props }) => {
  const isActive = props.active;

  return (
    <div
      className="rounded-md"
      style={{
        background: isActive ? indigo.indigo3 : "",
        color: isActive ? indigo.indigo9 : "",
      }}
    >
      <StyledTrigger active={isActive.toString()}>{children}</StyledTrigger>
    </div>
  );
};

const StyledCaret = styled(CaretDownIcon, {
  position: "relative",
  color: indigo.indigo10,
  top: 1,
  "[data-state=open] &": { transform: "rotate(-180deg)" },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "transform 250ms ease",
  },
});

const StyledTriggerWithCaret = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <CustomTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledCaret aria-hidden />
    </CustomTrigger>
  )
);

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: "block",
  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

const StyledButton = styled(NavigationMenuPrimitive.Link, {
  ...itemButtonStyles,
  display: "block",
  background: indigo.indigo10,
  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

const StyledContent = styled(NavigationMenuPrimitive.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  "@media only screen and (min-width: 600px)": { width: "auto" },
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  top: "100%",
  overflow: "hidden",
  zIndex: 1,

  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, transform 250ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
});

const StyledArrow = styled("div", {
  position: "relative",
  top: "70%",
  backgroundColor: "white",
  width: 10,
  height: 10,
  transform: "rotate(45deg)",
  borderTopLeftRadius: 2,
});

const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
  <StyledIndicator {...props} ref={forwardedRef}>
    <StyledArrow />
  </StyledIndicator>
));

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: "absolute",
  transformOrigin: "top center",
  marginTop: 10,
  width: "100vw",
  backgroundColor: "white",
  borderRadius: 6,
  overflow: "hidden",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",

  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)",
  },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, height, 300ms ease",
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
});

const NextLink = ({ children, ...props }) => {
  // const resolved = useResolvedPath(href);
  // const match = useMatch({ path: resolved.pathname, end: true });
  // const isActive = Boolean(match);
  return (
    <Link href={props.href} passHref>
      <StyledLink asChild>
        <a style={props.css} {...props}>
          {children}
        </a>
      </StyledLink>
    </Link>
  );
};
const NextButton = ({ children, ...props }) => {
  // const resolved = useResolvedPath(href);
  // const match = useMatch({ path: resolved.pathname, end: true });
  // const isActive = Boolean(match);
  return (
    <Link href={props.href} passHref>
      <StyledButton asChild>
        <a style={props.css} {...props}>
          {children}
        </a>
      </StyledButton>
    </Link>
  );
};

// Exports
const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuLink = NextLink;
const NavigationMenuButton = NextButton;
const NavigationMenuContent = StyledContent;
const NavigationMenuViewport = StyledViewport;
const NavigationMenuIndicator = StyledIndicatorWithArrow;

// Your app...
const ContentList = styled("ul", {
  display: "grid",
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: "none",

  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 600px)": {
          width: 500,
          gridTemplateColumns: ".75fr 1fr",
        },
      },
      two: {
        "@media only screen and (min-width: 600px)": {
          width: 600,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, 1fr)",
        },
      },
      three: {
        "@media only screen and (min-width: 600px)": {
          width: 650,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, 1fr)",
        },
      },
    },
  },
});

const ListItem = styled("li", {});

const LinkTitle = styled("div", {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: indigo.indigo12,
});

const LinkText = styled("p", {
  all: "unset",
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: "initial",
});

const ContentListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <ListItem>
      <NavigationMenuLink
        {...props}
        ref={forwardedRef}
        css={{
          padding: 12,
          borderRadius: 6,
          "&:hover": { backgroundColor: mauve.mauve3 },
        }}
      >
        <LinkTitle>{title}</LinkTitle>
        <LinkText>{children}</LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
);

const ContentListItemCallout = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <ListItem css={{ gridRow: "span 3" }}>
      <NavigationMenuLink
        {...props}
        href="/post/the-freemium-web-youve-read-all-your-free-articles-this-month"
        ref={forwardedRef}
        css={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${pink.pink9} 0%, ${red.red9} 100%)`,
          borderRadius: 6,
          padding: 25,
        }}
      >
        <LinkTitle
          css={{
            fontSize: 18,
            color: "white",
            marginTop: 16,
            marginBottom: 7,
          }}
        >
          <FormattedMessage id="navbar.contentitem.title" />
        </LinkTitle>
        <LinkText
          css={{
            fontSize: 14,
            color: mauve.mauve4,
            lineHeight: 1.3,
          }}
        >
          <FormattedMessage id="navbar.contentitem.desc" />
        </LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
);

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  top: "100%",
  left: 0,
  // left: '-10%',

  perspective: "2000px",
});

export const NavigationMenuDemo = ({
  activeNav,
  collapsed,
  user,
  userLoading,
  userLoggedInCookie,
}) => {
  const intl = useIntl();
  const title3 = intl.formatMessage({ id: "navbar.menu.title3" });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <LocaleSwitcher collapsed={collapsed} />

        <NavigationMenuItem
          className={`hidden mr-3 md:block ${
            !collapsed ? "md:opacity-0 md:flex md:invisible" : "md:flex"
          } transition transition-all duration-500 ease-in-out md:flex-col md:justify-center`}
        >
          <NavigationMenuLink href="/post/write-for-us">
            {title3}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex flex-col justify-center">
          {user && user.isLoggedIn ? (
            <div className="ml-2">
              <Link href="/account">
                {user.avatar ? (
                  <ProfileBadge
                    icon={
                      <img
                        className="hover:shadow border border-1 rounded-full my-auto w-8 h-8 cursor-pointer"
                        src={user.avatar.url}
                      />
                    }
                  />
                ) : (
                  <ProfileBadge
                    icon={
                      <Gravatar
                        className="hover:shadow border border-1 rounded-full my-auto w-8 h-8 cursor-pointer"
                        email={user.email}
                      />
                    }
                  />
                )}
              </Link>
            </div>
          ) : userLoading && userLoggedInCookie ? (
            <div className="bg-gray-200 hover:shadow border border-1 ml-2 rounded-full my-auto w-8 h-8 cursor-pointer"></div>
          ) : (
            <NavigationMenuButton href="/newsletter">
              {intl.formatMessage({ id: "navbar.menu.title4" })}
            </NavigationMenuButton>
          )}
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>

      <ViewportPosition className="ml-0 sm:-ml-12">
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
