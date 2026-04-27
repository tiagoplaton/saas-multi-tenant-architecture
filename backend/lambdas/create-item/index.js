exports.handler = async (event) => {
  const tenantId = event.tenant_id || "unknown";

  const item = {
    tenant_id: tenantId,
    resource_id: Date.now().toString(),
    data: "example data"
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Item created successfully",
      item
    })
  };
};
