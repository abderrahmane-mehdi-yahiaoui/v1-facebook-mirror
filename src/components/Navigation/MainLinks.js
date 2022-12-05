import React from "react";
import { Route } from "react-router-dom";
import { NavigationLink, NavigationList, HoverLink } from "../Styles/Styles";
import styled from "styled-components";
import * as Icon from "../Icons/static";
export default function MainLinks() {
  return (
    <Navigation>
      <ListContainer id="main-links">
        <NoOverlap>
          {Links.map((data, index) => (
            <Route
              key={index}
              path={data.path}
              exact
              children={({ match }) => (
                <NavigationList key={index} className={data.ariaLabel}>
                  <NavigationLink
                    activeClassName="--activeLink"
                    exact
                    key={index}
                    to={data.path}
                    title={data.ariaLabel}
                    aria-label={data.ariaLabel}
                  >
                    {match ? data.activeIcon : data.icon}
                  </NavigationLink>
                  <HoverLink />
                </NavigationList>
              )}
            />
          ))}
        </NoOverlap>
      </ListContainer>
    </Navigation>
  );
}
const Navigation = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
`;
const NoOverlap = styled.div`
  width: 100%;
  max-width: 710px;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1000px) {
    & {
      justify-content: flex-start;
    }
  }
`;
const ListContainer = styled.ul`
  padding: 0 200px;
  width: 100%;
  height: var(--header-size);
  display: flex;
  justify-content: center;
  & .bookmarks {
    display: none;
  }
  @media only screen and (max-width: 1050px) {
    & .bookmarks {
      display: block;
    }
  }
  @media only screen and (max-width: 1050px) {
    & .groups {
      display: none;
    }
  }
  @media only screen and (max-width: 1000px) {
    & .market {
      display: none;
    }
    & .friends {
      display: none;
    }
    & .watch {
      display: none;
    }
    & .Home {
      display: none;
    }
  }
  @media only screen and (max-width: 1000px) {
    &#main-links {
      padding: 0 110px;
    }
    & .bookmarks {
      max-width: calc(15vw - 55px);
    }
  }
`;

const Links = [
  {
    ariaLabel: "Home",
    path: "/",
    icon: <Icon.HomeIcon className="headerIcon" />,
    activeIcon: <Icon.ActiveHome className={`headerIcon`} />,
  },
  {
    ariaLabel: "friends",
    path: "/friends",
    icon: <Icon.FriendsIcon className="headerIcon" />,
    activeIcon: <Icon.ActiveFriends className="headerIcon" />,
  },
  {
    ariaLabel: "watch",
    path: "/watch",
    icon: <Icon.MediaVideoIcon className="headerIcon" />,
    activeIcon: <Icon.ActiveMediaVideo className="headerIcon" />,
  },
  {
    ariaLabel: "market",
    path: "/market",
    icon: <Icon.MarketIcon className="headerIcon" />,
    activeIcon: <Icon.ActiveMarket className="headerIcon" />,
  },
  {
    ariaLabel: "groups",
    path: "/groups",
    icon: <Icon.GroupsIcon className="headerIcon" />,
    activeIcon: <Icon.ActiveGroups classame="headerIcon" />,
  },
  {
    ariaLabel: "bookmarks",
    path: "/bookmarks",
    icon: <Icon.BarsIcon className="headerIcon" />,
    activeIcon: <Icon.ActiveBars className="headerIcon" />,
  },
];
