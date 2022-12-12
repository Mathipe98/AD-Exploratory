type Endpoint = {
  displayName: string;
  route: string;
  component: (props?: any) => JSX.Element;
};

interface NavBarProps {
  endpoints: Endpoint[];
}

export type { Endpoint, NavBarProps };
