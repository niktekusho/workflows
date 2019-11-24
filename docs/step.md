# Step

A step is a unit of work in at least one workflow.
Multiple workflows can share steps.

Each step should define:
- id of some sorts unique across all defined steps
- display name (optional) which gives a step a "talkative" name (useful for lists of steps)
- step description (optional)
- instruction to execute (as of this spec., only one instruction per step is permitted)
- instruction's input parameters (optional)
- flag for "is this step abortable?"
- flag for "can this step fail silently, or should it break the workflow?"


The above characteristics form the basis of the step *definition* structure.

When a workflow executes one of his steps, the step currently executed gets a few new details.
The idea is that the *step precompiler* (not yet defined) takes a step *definition* and produces a step *execution*.
The step execution is essentially an identifiable instance of a step definition.
I imagined it would have those properties:
- Id and display name propagated from the step definition. These would come in handy for analytics (how much the step 'a' have run) and for user notification (in workflow 'a' the app is currently running step 'pretty name').
- The system should generate a unique sort of id, different from the one of the step definition, which lets you keep a history of step executions. It could be a completely random UUID or something based on the combination of step definition id and current timestamp.
- The system should generate a "compiled" version of the instruction defined in the step definition, with the input parameters baked in the instruction.
