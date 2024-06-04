const validationMiddleware = (paramname, schema, ...emg) => {
  return async (ctx, next) => {
    let result = false;
    let result2 = false;

    function validation(paramname, schema) {
      if (paramname === 'request.body') {
        return schema.validate(ctx.request.body);
      } else if (paramname === 'request.query') {
        return schema.validate(ctx.request.query);
      } else {
        return schema.validate({
          [paramname]: ctx.params[paramname],
        });
      }
    }

    result = validation(paramname, schema);

    if (emg.length > 0) {
      let [paramname2, schema2] = [...emg];
      result2 = validation(paramname2, schema2);
    }

    if (result.error) {
      ctx.body = JSON.stringify(
        {
          message: result.error.details[0].message,
        },
        null,
        2,
      );
    } else if (emg.length > 0 && result2.error) {
      throw new Error(result2.error);
    } else {
      await next();
    }
  };
};

module.exports = validationMiddleware;
