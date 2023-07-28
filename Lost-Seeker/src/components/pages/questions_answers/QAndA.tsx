import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import NavBar from "../../shared/NavBar";
export default function QAndA() {
  const [onTop, setOnTop] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };
  return (
    <div
      onScroll={handleScroll}
      className="flex flex-col items-center w-screen overflow-x-hidden h-screen relative "
    >
      <NavBar
        onTop={onTop}
        links={["List", "Contribute", "About", "Questions"]}
      />
      <div className="pt-20 px-4 md:px-10 lg:px-14 xl:px-20">
        <div className="xl:w-[50rem] pt-10 md:pt-14 xl:pt-20 ">
          <Accordion>
            <AccordionItem className="xl:w-[50rem]">
              <AccordionItemHeading>
                <AccordionItemButton>
                  This is a test questions?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
                  occaecat ut occaecat consequat est minim minim esse tempor
                  laborum consequat esse adipisicing eu reprehenderit enim.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="xl:w-[50rem]">
              <AccordionItemHeading>
                <AccordionItemButton>
                  This is a test questions?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  In ad velit in ex nostrud dolore cupidatat consectetur ea in
                  ut nostrud velit in irure cillum tempor laboris sed
                  adipisicing eu esse duis nulla non.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="xl:w-[50rem]">
              <AccordionItemHeading>
                <AccordionItemButton>
                  This is a test questions?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  In ad velit in ex nostrud dolore cupidatat consectetur ea in
                  ut nostrud velit in irure cillum tempor laboris sed
                  adipisicing eu esse duis nulla non.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="xl:w-[50rem]">
              <AccordionItemHeading>
                <AccordionItemButton>
                  This is a test questions?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  In ad velit in ex nostrud dolore cupidatat consectetur ea in
                  ut nostrud velit in irure cillum tempor laboris sed
                  adipisicing eu esse duis nulla non.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="xl:w-[50rem]">
              <AccordionItemHeading>
                <AccordionItemButton>
                  This is a test questions?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  In ad velit in ex nostrud dolore cupidatat consectetur ea in
                  ut nostrud velit in irure cillum tempor laboris sed
                  adipisicing eu esse duis nulla non.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem className="xl:w-[50rem]">
              <AccordionItemHeading>
                <AccordionItemButton>
                  This is a test questions?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  In ad velit in ex nostrud dolore cupidatat consectetur ea in
                  ut nostrud velit in irure cillum tempor laboris sed
                  adipisicing eu esse duis nulla non.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
