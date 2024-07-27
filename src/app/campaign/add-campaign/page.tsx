"use client";
import React, { useState } from "react";
import { Tabs, Tab, Input, Button, Card, CardBody } from "@nextui-org/react";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState<string | number>("campaign-name");
  return (
    <>
      <div className="container mx-auto p-4 max-w-[50%] mt-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Add Campaigns
        </h1>
      </div>
      <div className="flex flex-col w-full items-center justify-center mt-10">
        <Card className="max-w-[90%] h-[90%]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Campaign Tabs"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="campaign-name" title="Campaign Name">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Campaign Name"
                    placeholder="Enter campaign name"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="language-voice" title="Language & Voice">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Language"
                    placeholder="Enter language"
                  />
                  <Input isRequired label="Voice" placeholder="Enter voice" />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="script" title="Script">
                <form className="flex flex-col gap-4">
                  <Input isRequired label="Script" placeholder="Enter script" />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="knowledge-base" title="Knowledge Base">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Knowledge Base"
                    placeholder="Enter knowledge base"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="purpose" title="Purpose">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Purpose"
                    placeholder="Enter purpose"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="details" title="Details">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Details"
                    placeholder="Enter details"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="post-call-analysis" title="Post Call Analysis">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Post Call Analysis"
                    placeholder="Enter post call analysis"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="review" title="Review">
                <form className="flex flex-col gap-4">
                  <Input isRequired label="Review" placeholder="Enter review" />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Save
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
