exports.handler = async (event) => {
  const tenantId = event.tenant_id || "unknown";

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Simulated multi-tenant response",
      tenant: tenantId
    })
  };
};
