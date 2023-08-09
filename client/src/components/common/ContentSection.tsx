interface ContentSectionProp {
  children: JSX.Element;
}

const ContentSection = ({ children }: ContentSectionProp): JSX.Element => {
  return <main>{children}</main>;
};

export default ContentSection;
